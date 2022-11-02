---
title: How to install Paperclip in Rails 3
date: "2011-09-24T22:12:03.284Z"
tags: ["progamming", "rails", "paperclip"]
featuredImage: ./images/181912_300-1200x565.jpg
---

Paperclip is a plugin/gem created by the talented folks at [ThoughtBot](http://thoughtbot.com/ "Thoughtbot"). It will make using attachments and uploads in your rails application ridiculously easy to implement. Let’s get started!

## Things you’ll need installed

Before we start there is only one thing that you will need to have installed on your system before we can proceed.

**ImageMagik**  
[ImageMagik](http://www.imagemagick.org/ "ImageMagick") is a software suite that is used to edit and create images. Paperclip uses it to resize and modify images. The easiest way to install this is to first make sure that you have [MacPorts installed](http://www.macports.org/install.php "MacPorts Installation"), and then running:  
> sudo port install ImageMagick    

This is a massive library and it will take a little while to install.

## Installing Paperclip

So you can install Paperclip as a plugin, or you can install it as a gem.

**Install as a Gem**  
This is the recommended way of installing Paperclip. All you need to do is to add to your _config/environment.rb_  
> config.gem 'paperclip', :source => 'http://rubygems.org'

Then run:  
> 
> rake gems:install
> 
> rake gems:unpack

Or you can add it directly to your Gemfile if you have Bundler:

> source 'http://rubygems.org'   gem 'paperclip' 

**Install as a Plugin  

To install it as a plugin you use:

> ruby script/plugin install git://github.com/thoughtbot/paperclip.git

## Using Paperclip in Your Application

Lets add the ‘has_attached_file’ attributes to the model we want to be able to attach files to:

```ruby
class Author > ActiveRecord::Base
  has_attached_file :avatar,
    :styles => {
      :thumb => "75x75#",
      :small => "100x100#",
      :medium => "150x150>"
    }
end
```

Thankfully attached files do not need to have a separate model. Your attachments are essentially treated like another attribute. The image is not saved until your model is saved (if you desire, there are ways of forcing attachment creation/updates without model involvement – but that’s another tutorial)

Now that we have our model paperclip enabled we need to add some database columns to provide full support for it.

```ruby
class AddAvatarToAuthor > ActiveRecord::Migration
  def self.up
    add_column :author, :avatar_file_name, :string
    add_column :author, :avatar_content_type, :string
    add_column :author, :avatar_file_size, :integer
  end
  def self.down
    remove_column :author, :avatar_file_name
    remove_column :author, :avatar_content_type
    remove_column :author, :avatar_file_size
  end
end
```

So the first part of the column name is the same as what we called our attachment attribute in our model. In this case that’s photo. Now to update our database we use:

> rake db:migrate

Now that we have our database and our model taken care of, we can start working on our content. So in our view we can add a file field:

```ruby
<% form_for :author, :html => {:multipart => true} do |f| %>
  <%= f.label :avatar %>
  <%= f.file_field :avatar %>
  <%= f.submit %>
<% end %>
```
## Displaying Attachments

Now when you want to display your model’s attachments all you need to do is use:

```ruby
<%= image_tag @author.avatar.url %>
<%= image_tag @author.avatar.url(:thumb) %>
```

## Dimensions of file while uploading

To get the dimensions of the file while you’re uploading, you’ll have to add a validation to check the image dimensions.

```ruby
validate :avatar_dimensions
```

Then somewhere else in your code you have a method to check the dimensions, and if not a suitable size then to throw an error.

```ruby
def check_avatar_dimensions
  img_size = Paperclip::Geometry.from_file(avatar.to_file(:original))
  if dimensions.width > 100 || dimensions.height
    errors.add(:avatar, 'Size of avatar has a maximum size of 100x100')
  end
end
```
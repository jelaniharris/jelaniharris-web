import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';


const About = ({location}) => {
    return (
        <Layout location={location} title={"About"} preMain={
            <PreMain additionalClasses="breadcrumbs">
              <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                <ul>
                  <li><Link to="/">
                  <span class="icon is-small">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                    Home</Link></li>
                  <li className="is-active"><a href="#" aria-current="page">About Me</a></li>
                </ul>
              </nav>
            </PreMain>
        }>
            <Seo
                title={"About"}
                description={"About myself"}
            />
            <article
                className="webpage content py-5"
                itemScope
                itemType="http://schema.org/WebPage"
            >
                <h1 className="title is-1" itemProp="headline">About Myself</h1>
                <h2>What do you enjoy?</h2>
                <p>I’m a pretty simple guy, I enjoy three things.</p>
                <h3>The Internet and Web Design</h3>
                <p>I’ve been using the internet since CompuServe came with my windows 95 computer so many years ago. I first had a Geocitites ( now affectionately refered to as Geoshitties amongst my friends) page in 1997 and then moved to using a tripod page. Then I got my own web hosting from a company called Tera-byte where I got first exposure to PHP and MYSQL. When I realized that I was paying a premium with little benefits I then moved to the hosting that I have now at Site5.</p>
                <p>I suppose I’ve been developing real websites since 2001, but it has always been a hobby and I’ve never attempted to do it professionally before. The best part that I enjoy about web design is mainly doing the front end stuff that involves photoshop and CSS/HTML. But, I also like doing the nitty-gritty backend things as well. A<span style={{textDecoration: "line-through"}}>s long as I don’t have to deal with IE5 or IE6</span>.</p>
                <h3>Video Games</h3>
                <p>I’ve been playing video games for as long as I can remember. My first computer/gaming system was an Commodore 64, and then I upgraded to an Atari 2600, and then a Nintendo into a Super Nintendo along with a Sega Genesis, then I got a Sega Saturn (ugh) and a Sony PlayStation, then a Sega DreamCast and a PlayStation 2, and now I’m the <span style={{textDecoration: "line-through"}}>proud</span> owner of a <span style={{textDecoration: "line-through"}}>broken</span>, <span style={{textDecoration: "line-through"}}>ticking time-bomb</span>, <span style={{textDecoration: "line-through"}}>POS</span> XBox 360.</p>
                <p>Of course it’s not just console games. I’ve had a computer for as long as I can remember. I’ve played a majority of all of the DOS era games and the Windows ones as well. Right now I’m into Guild Wars, World of Warcraft, Call of Duty 4, and Civilization IV.</p>
                <p>Obviously my love for Video Games has inspired me to try to develop them myself. My best friend and I are attempting to create a small-time indie game development group to make the games we’ve always wanted to make since we were little. We’ve got a few projects in development right now, but our group’s website isn’t really up to standards right now so I can’t advertise that until it’s acceptable.</p>
                <h3>Art and Writing</h3>
                <p>Other than computers and video games I also enjoy reading science fiction / fantasy novels.</p>
                <p>I’ve written about 4-5 short stories and one full length novel. I’m still debating where I should put these completed short-stories (they’re not good enough concept wise to be apart of an anthology), and I’m <span style={{textDecoration: "line-through"}}>cleaning</span> rewriting my novel to submit to a publisher on my weekends.</p>
                <p>I exhausted all of the art classes in my high school and was on the edge of declaring myself an art major in college until I decided to go in head-first with computer engineering.</p>
                <h2>So is that it?</h2>
                <p>Yeah, that’s about everything someone would like to know about me. Apart from silly favorite stuff:</p>
                <ul>
                    <li>Favorite Colors: Blue and Black</li>
                    <li>Favorite Foods: Dutch Apple Pie and Ice Cream Sandwiches</li>
                    <li>Favorite <em>Healthy </em>Food: Sugar Snap Peas</li>
                    <li>Favorite Board Games: Citadels and Carcassonne</li>
                    <li>Favorite Book: <a onclick="javascript:pageTracker._trackPageview('/outgoing/www.amazon.com/gp/product/0441444253/ref=cm_cr_pr_product_top');" href="http://www.amazon.com/gp/product/0441444253/ref=cm_cr_pr_product_top">Kilobyte</a> by Piers Anthony</li>
                    <li>Favorite Saying: “Those that can’t create, critique.”</li>
                </ul>
            </article>
        </Layout>
    )
}

export default About;

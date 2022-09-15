import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PreMain from "../components/premain"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPerson, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = ({location}) => {
    return (
        <Layout location={location} title={"Contact"} preMain={
            <PreMain additionalClasses="breadcrumbs">
              <nav className="breadcrumb is-medium" aria-label="breadcrumbs">
                <ul>
                  <li><Link to="/">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                    Home</Link></li>
                  <li className="is-active"><a href="#" aria-current="page">Contact Me</a></li>
                </ul>
              </nav>
            </PreMain>
        }>
            <Seo
                title={"Contact"}
                description={"Contact Me by using the handy form"}
            />
            <article
                className="webpage content"
                itemScope
                itemType="http://schema.org/WebPage"
            >
                <h1 className="title is-1 pt-5" itemProp="headline">Contact Me</h1>
                <form name="contact-form" method="POST" action="/thank-you" data-netlify="true" data-netlify-recaptcha="true">
                    <input type="hidden" name="form-name" value="Contact Form" />
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="label is-medium">Name*</label>
                                <div className="control has-icons-left">
                                    <input required className="input is-medium" name="name" type="text" placeholder="e.g. Jelani Harris" />
                                    <span class="icon is-small is-left">
                                        <FontAwesomeIcon icon={faPerson} />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label is-medium">Email*</label>
                                <div className="control has-icons-left">
                                    <input required className="input is-medium" name="email" type="text" placeholder="e.g. jharris@gooooogle.com" />
                                    <span class="icon is-small is-left">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label is-medium">Subject*</label>
                                <div className="control has-icons-left">
                                    <input required className="input is-medium" name="subject" type="text" placeholder="e.g. Business" />
                                    <span class="icon is-small is-left">
                                        <FontAwesomeIcon icon={faBars} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div class="field">
                                <label class="label is-medium">Message*</label>
                                <div class="control">
                                    <textarea required name="message" class="textarea is-medium" placeholder="Enter your message here ..."></textarea>
                                </div>
                            </div>
                            <div class="field is-grouped is-flex is-justify-content-center">
                                <div class="control">
                                    <button class="button is-link is-medium is-fullwidth">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </article>
        </Layout>
    );
}

export default Contact;

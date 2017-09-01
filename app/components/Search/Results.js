import React, { Component } from "react";
import helpers from "../../utils/helpers";
import moment from "moment";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article_id: "",
      title: "",
      url: "",
      pub_date: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.renderNoArticles = this.renderNoArticles.bind(this);
    this.renderArticles = this.renderArticles.bind(this);
  }
  handleClick(article) {
    helpers.saveArticle(article);
    alert("Keeping this Article");
  }
  renderNoArticles() {
    return (
      <li className="list-group-item">
        <h3 className="text-center"><em>No articles found!</em></h3>
      </li>
    )
  }
  renderArticles() {
    return this.props.results.docs.map(function(article, index) {
      return (
        <li className="list-group-item" key={index}>
          <h3>
            <button className="btn btn-primary pull-right" onClick={() => this.handleClick(article)}>
              <i className="fa fa-saved" aria-hidden="true">Save</i>
            </button>
            <a href={article.web_url} rel="noopener noreferrer" target="_blank">
              <em>{article.headline.main}</em>
            </a>
          </h3>
          <p><em>{moment(article.pub_date).format('MMMM D, YYYY')}</em></p>
        </li>
      )
    }.bind(this));
  }
  render() {
    return (
      <div id="results" className="row">
        <div className="col-lg-12">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">
                <strong>
                  <i className="fa fa-list-alt" aria-hidden="true"></i>&nbsp;
                  Results
                </strong>
              </h3>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                {/* uses inline if-else with conditional operator */}
                {/* condition ? true : false */}
                {this.props.results.docs.length === 0 ? this.renderNoArticles() : this.renderArticles()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

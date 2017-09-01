import React, { Component } from "react";
import helpers from "../utils/helpers";
import moment from "moment";

export default class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.renderNoSaved = this.renderNoSaved.bind(this);
    this.renderSaved = this.renderSaved.bind(this);
  }
  componentDidMount() {
    helpers.getSaved().then(function(res) {
      // only updates if any saved articles are found
      if (res.data.length > 0) {
        this.setState({ saved: res.data });
      };
    }.bind(this));
  }
  handleClick(article) {
    helpers.deleteSaved(article)
    .then(function() {
      helpers.getSaved().then(function(res) {
        this.setState({ saved: res.data });
      }.bind(this));
    }.bind(this));
    alert("You deleted a Saved Article!");
  }
  renderNoSaved() {
    return (
      <li className="list-group-item">
        <h3 className="text-center"><em>You have no articles saved.</em></h3>
      </li>
    )
  }
  renderSaved() {
    return this.state.saved.map(function(article, index) {
      return (
        <li className="list-group-item" key={index}>
          <h3>
            <button className="btn btn-primary pull-right" onClick={() => this.handleClick(article)}>
              <i className="fa fa-remove" aria-hidden="true">Remove</i>
            </button>
            <a href={article.url} rel="noopener noreferrer" target="_blank">
              <em>{article.title}</em>
            </a>
          </h3>
          <p><em>{moment(article.pub_date).format('MMMM D, YYYY')}</em></p>
        </li>
      )
    }.bind(this));
  }
  render() {
    return (
      <div className="saved-wrapper">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <strong>
                    <i className="fa fa-saved" aria-hidden="true"></i>&nbsp;
                    Saved
                  </strong>
                </h3>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.state.saved.length === 0 ? this.renderNoSaved() : this.renderSaved()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

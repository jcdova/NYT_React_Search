import React, { Component } from "react";

export default class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      startYr: "",
      endYr: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.runQuery(this.state.topic, this.state.startYr, this.state.endYr);
  }
  render() {
    return (
      <div id="query" className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <strong>
                    <i className="fa fa-search" aria-hidden="true"></i>&nbsp;
                    Query
                  </strong>
                </h3>
              </div>
              <div className="panel-body">
                <form className="form-horizontal" ref="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label className="col-sm-2 col-md-2 control-label" htmlFor="search"><strong>Topic</strong></label>
                    <div className="col-sm-10 col-md-10">
                      <input
                        className="form-control"
                        id="topic"
                        ref="topic"
                        type="text"
                        value={this.state.topic}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-md-2 control-label" htmlFor="startYr"><strong>Start Year</strong></label>
                    <div className="col-sm-4 col-md-4">
                      <input
                        className="form-control"
                        id="startYr"
                        ref="startYr"
                        type="number"
                        min="1970"
                        max="2017"
                        step="1"
                        value={this.state.startYr}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <label className="col-sm-2 col-md-2 control-label" htmlFor="endYr"><strong>End Year</strong></label>
                    <div className="col-sm-4 col-md-4">
                      <input
                        className="form-control"
                        id="endYr"
                        ref="endYr"
                        type="number"
                        min="1970"
                        max="2017"
                        step="1"
                        value={this.state.endYr}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-default pull-right">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
  }
};
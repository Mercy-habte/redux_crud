import React, { Component } from "react";
import { connect } from "react-redux";
import { updateJob, deleteJob } from "../actions/jobs";
import JOBDataService from "../services/job.service";

class Job extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getJob = this.getJob.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeJob = this.removeJob.bind(this);

    this.state = {
      currentJob: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getJob(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentJob: {
          ...prevState.currentJob,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentJob: {
        ...prevState.currentJob,
        description: description,
      },
    }));
  }

  getJob(id) {
    JOBDataService.get(id)
      .then((response) => {
        this.setState({
          currentJob: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentJob.id,
      title: this.state.currentJob.title,
      description: this.state.currentJob.description,
      published: status,
    };

    this.props
      .updateJob(this.state.currentJob.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentJob: {
            ...prevState.currentJob,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateJob(this.state.currentJob.id, this.state.currentJob)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The Job was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeJob() {
    this.props
      .deleteJob(this.state.currentJob.id)
      .then(() => {
        this.props.history.push("/jobs");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentJob } = this.state;

    return (
      <div>
        {currentJob ? (
          <div className="edit-form">
            <h4>Job</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentJob.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentJob.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentJob.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentJob.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeJob}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateJob, deleteJob })(Job);

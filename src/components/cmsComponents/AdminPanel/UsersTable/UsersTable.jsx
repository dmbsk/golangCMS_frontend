import React from 'react';
//import {Link} from 'react-router-dom';
import './userTable.scss';

class AdminArticleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      deleteRespond: null,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentDidMount() {
    const method = 'GET';
    fetch('http://localhost:8000/users', {method}).then(
      res => res.json(),
    ).then(
      (data) => {
        this.setState({ users: data.filter((user) => (user.username !== 'admin'))});
      });
  };

  deleteArticle = (index) => {
    const method = 'DELETE';
    const {users} = this.state;
    const user = users[index];
    user.respondStatus ? delete user.respondStatus : null;
    const body = JSON.stringify(user);
    console.log(body)
    fetch('http://localhost:8000/users', {body, method}).then(
      res => this.setState({deleteRespond: res}),
    );
    users.splice(index, 1);
    this.setState({users});
  };

  changeHandler = (event) => {
    const {users} = this.state;
    const targetIndex = event.target.getAttribute('data-index');
    users[targetIndex] = {...users[targetIndex], role: event.target.value};
    users[targetIndex].respondStatus ? delete users[targetIndex].respondStatus : null;
    const method = 'PUT';
    const body = JSON.stringify(users[targetIndex]);
    console.log(body);
    fetch('http://localhost:8000/users', {body, method}).then(
      res => {
        users[targetIndex].respondStatus = res.status;
        this.setState({ users });
      }
    );
  };

  apiPrettyResponse = (respond) => {
    const style = {
      color: respond === 200 ? 'green' : 'red'
    }
    if(respond === 200) {
      return <b className="role-update-status" style={style}>Done</b>
    }
    else if(respond !== 200 && respond !== null) {
      return <b className="role-update-status" style={style}>Failed</b>
    }
    return null
  };
  render() {
    const {users} = this.state;

    const articleItems = users ? users.map((user, index) => {
      const respondStatus = 'respondStatus' in user ? user.respondStatus : null;
      const {
       username, role, description, id
      } = user;
      return (
        <div className="grid-item" key={id} data-index={index}>
          <div className="grid-controls">
            <a className="grid-control-delete" data-index={index} onClick={(e) => {
              const clickedIndex = e.target.getAttribute('data-index');
              this.deleteArticle(clickedIndex)
            }}>delete</a>
          </div>
          <div className="grid-author-username"><h3>{username}</h3></div>
          <div className="grid-author-role">
            <form>
              <select onChange={this.changeHandler} value={role} data-index={index}>
                <option value="reader">Reader</option>
                <option value="writer">Writer</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </form>
            {this.apiPrettyResponse(respondStatus)}
          </div>
          <div className="grid-author-description">{description}</div>
        </div>
      );
    }) : null;

    return (
      <div className="admin-table admin-user-table not-center">
        <div className="admin-grid admin-grid-title">
          <div className="grid-author-username"><h3>Username</h3></div>
          <div className="grid-author-role">role</div>
          <div className="grid-author-description">description</div>
        </div>
        {articleItems}
      </div>
    );
  }
}

export default AdminArticleTable;

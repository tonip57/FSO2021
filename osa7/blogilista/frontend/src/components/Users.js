import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    marginBottom: 5
  }
  return(
    <div className='rowColor2'>
      {users === null && <h4>Users not found</h4>}
      {users !== null &&
      <div>
        <h1 className='titles'>Users</h1>
        <table>
          <tbody>
            <tr><td></td><td style={style}>blogs created</td></tr>
            {users.map(user =>
              <tr key={user.username}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      }
    </div>
  )}

export default Users
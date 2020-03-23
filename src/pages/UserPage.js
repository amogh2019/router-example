import React, { useState, useEffect } from 'react'
import axios from 'axios'

// this is the react hook way for writing react components // refer snake card to see the react class way of writing component
export default function UserPage(props) {
  const initialUserState = {
    name: 'chcha!',
    loading: true,
  }

  const [user, setUser] = useState(initialUserState)

  useEffect(() => {
    const getUser = async () => {
      const { data } = 
        await axios(`https://api.github.com/users/${props.match.params.id}`)
        .catch((error) => {
          return { 
            data : {
              errormsg : 'jinhe Chcha ko aap khoj rahe the, nahi mile! :/ mumbai mein baaad ayi thi, bas, beh gye',
              loading: false
              }
            }
        });
      
      setUser(data) // this will overide the user state object // like its not setting the loading field, will be undefined......this aint like this.setState(it merges)
    }

    getUser()
  }, [props.match.params.id])

  return user.loading ? (
  <div>Loading...<p>{user.name}</p></div>
  ) : (
    <div className="container">
      <h1>{props.match.params.id}</h1>
      <h1>{user.errormsg}</h1>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Public_Repos</th>
            <th>Website</th>
            <th>Profile_Link</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.location}</td>
            <td>{user.public_repos}</td>
            <td>
              <a href={user.blog}>{user.blog}</a>
            </td>
            <td>
              <a href={user.html_url}>{user.login}</a>
            </td>
            <td>{user.followers}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

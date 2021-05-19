import './App.css';
import { Box, Grid, NativeSelect, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import mockResponse from './mockData/mockResponse';
import profile_pic from './assests/profile_pic.jpg';
import imagesArray from './assests/index';
import blueTick from './assests/bluetick.png';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: "",
      dataReceived: false,
      userDetails:{
        full_name: "",
        username: "",
        profile_pic_url: "",
        edge_followed_by: null,
        edge_follow: null,
        edge_owner_to_timeline_media: null,
        biography: "",
        edges: [],
      }
    };
  }

  handleUserName = (event) => {
    const {value} = event.target;
    this.setState({
      userName: value,
    });
  }

  getData = async() => {
    const { 
      graphql: {
        user : {
          full_name ,
          username,
          profile_pic_url,
          edge_followed_by,
          edge_follow,
          edge_owner_to_timeline_media,
          biography,
          edge_owner_to_timeline_media : {
            edges
          }
        }}} = mockResponse;
    this.setState({
      userDetails: {
        ...this.state.userDetails,
        full_name,
        username,
        profile_pic_url,
        edge_follow,
        edge_followed_by,
        edge_owner_to_timeline_media,
        biography,
        edges,
      },
      dataReceived: true,
    });
  }
  
  render() { console.log(mockResponse);
    const {
      userName,
      dataReceived,
      userDetails:
      {
        full_name,
        username,
        profile_pic_url,
        edge_followed_by,
        edge_follow,
        edge_owner_to_timeline_media,
        biography,
        edges,
      }} = this.state;

    return (
      <div className="App">
        <Box px={20}>
          <Grid container direction="row">
            <Grid item md={3}/>
            <Grid item md={9}>
              <div style={{marginBottom: '31px'}}>
                <input className="userInput" type="text" value={userName} placeholder="Enter Username" onChange={this.handleUserName}/>
                <input className="submitBtn button" type="submit" onClick={this.getData} value="Submit"/>
              </div>
            </Grid>
            {dataReceived ? 
            <React.Fragment>
            <Grid item md={3}>
              <img className="profilePicture" src={profile_pic}/>
            </Grid>
            <Grid item md={9}>  
              <div className="firstLevelDetails displayDetails"> 
                <div className="userName">{username}</div>
                <img className="blueTick" src={blueTick}/>
                <input className="followBtn button" type="button" value="Follow"/>
                <NativeSelect className="select"></NativeSelect>
                <MoreHorizIcon className="icon"/>
              </div>
              <div className="secondLevelDetails displayDetails"> 
                <span className="postsCount">{edge_owner_to_timeline_media.count}</span>
                <span className="postsLabel">Posts</span>
                <div className="followers">{edge_followed_by.count} followers</div>
                <div className="following">{edge_follow.count} following</div>
              </div>
              <div className="fullName">{full_name}</div>
              <div className="biography">{biography}</div>
            </Grid> 
          </React.Fragment> : null }
            {dataReceived ?
            <React.Fragment>
            <Grid item md={12}>  
              <Tabs className="tabs">
                <Tab className="postsTab" label="posts"/>
                <Tab label="igtv"/>
                <Tab label="tagged" />
              </Tabs>
            </Grid>
              {imagesArray.map(imageSrc => {
                return (
                  <Grid item md={4} spacing={3}>
                    <img className="image" src={imageSrc} />
                  </Grid>
                );
              })}
              </React.Fragment> 
              : null 
            }
          </Grid>
        </Box>
      </div>
    );
  }
}

export default App;

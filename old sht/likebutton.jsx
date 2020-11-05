import './likestyle.css';
import React,{Component} from 'react';
class LikeButton extends Component {
  constructor() {
    super();
    this.state = {
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  } 
  
  handleClick() {
    this.setState({
      liked: !this.state.liked
    });
  }
  
  render() {
    const label = this.state.liked ? 'Unlike' : 'Like'
    return (
      <div className="customContainer">
        <button className="btn btn-primary" onClick={this.handleClick}>
          {label}</button>
      </div>
    );
  }
}
export default LikeButton;
const UserProfile = (props) => {
  return (
    <div style= {{border: '1px solid black', padding: '10px', margin: '10px'}}>
      <h2 style= {{color:'blue', fontSize: 32}}>{props.name}</h2>
      <p style= {{color:'red', fontSize: 64}}>Age: {props.age}</p>
      <p style= {{color:'green', fontSize: 16}}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile; 

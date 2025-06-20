import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="container">
      <div className="card">
        <img src="nakul.jpeg" alt="Person 1" />
        <h3>Person 1</h3>
        <a href="https://www.linkedin.com/in/nakul-bhadade?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B95wKW9iWQJSpsYOQIzipvQ%3D%3D" target="_blank" rel="noopener noreferrer">View LinkedIn</a>
      </div>
      <div className="card">
        <img src="pranjal.jpeg" alt="Person 2" />
        <h3>Person 2</h3>
        <a href="https://www.linkedin.com/in/pranjal-baghel-b4aa8a283?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUl4H9SEIT%2F2%2FJBRfpkY5ww%3D%3D" target="_blank" rel="noopener noreferrer">View LinkedIn</a>
      </div>
      <div className="card">
        <img src="lakshuki.jpeg" alt="Person 3" />
        <h3>Person 3</h3>
        <a href="https://www.linkedin.com/in/lakshuki-hatwar-a80090324?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BdTRWgIHNTsyHz3WYQUa77Q%3D%3D" target="_blank" rel="noopener noreferrer">View LinkedIn</a>
      </div>
      <div className="bottom-row">
        <div className="card">
          <img src="siddhi.jpeg" alt="Person 4" />
          <h3>Person 4</h3>
          <a href="https://www.linkedin.com/in/siddhi-dhoke-53b7b432b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BF7In4ymjSgK2aKOmpazp3A%3D%3D" target="_blank" rel="noopener noreferrer">View LinkedIn</a>
        </div>
        <div className="card">
          <img src="ness.jpeg" alt="Person 5" />
          <h3>Person 5</h3>
          <a href="https://www.linkedin.com/in/ness-dubey-461496326?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0FK22P%2BEQeqNgbxhXyin6g%3D%3D" target="_blank" rel="noopener noreferrer">View LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

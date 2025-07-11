import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="container">
      <div className="card">
        <img src="/public/developers/nakul.jpeg" alt="Person 1" />
        <h3>Nakul</h3>
        <a href="https://www.linkedin.com/in/nakul-bhadade?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B95wKW9iWQJSpsYOQIzipvQ%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

      <div className="card">
          <img src="/public/developers/ness.jpeg" alt="Person 5" />
          <h3>Ness</h3>
          <a href="https://www.linkedin.com/in/ness-dubey-461496326?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B0FK22P%2BEQeqNgbxhXyin6g%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

      <div className="card">
        <img src="/public/developers/lakshuki.jpeg" alt="Person 3" />
        <h3>Lakshuki</h3>
        <a href="https://www.linkedin.com/in/lakshuki-hatwar-a80090324?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BdTRWgIHNTsyHz3WYQUa77Q%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      
      <div className="card">
          <img src="/public/developers/siddhi.jpeg" alt="Person 4" />
          <h3>Siddhi</h3>
          <a href="https://www.linkedin.com/in/siddhi-dhoke-53b7b432b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BF7In4ymjSgK2aKOmpazp3A%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

      <div className="card">
        <img src="/public/developers/pranjal.jpeg" alt="Person 2" />
        <h3>Pranjal</h3>
        <a href="https://www.linkedin.com/in/pranjal-baghel-b4aa8a283?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUl4H9SEIT%2F2%2FJBRfpkY5ww%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  );
}

export default AboutUs;

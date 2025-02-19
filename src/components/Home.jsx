//Har använt mig av Claude 3.5 Sonnet för att starta upp strukturen till den här filen.
import React, { useState, useEffect } from 'react';

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7155/api/')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="home">
    
      <div>
        {data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
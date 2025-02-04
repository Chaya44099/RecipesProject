import  { useState, useEffect } from 'react';

const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const fullText = "ברוכים הבאים\nלאתר המתכונים\nשלי";
  const colors = [   '#9c27b0','#c96b38','#FF9900','#FFC107',];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText[index]);
        setIndex(prev => prev + 1);
        setColorIndex(prev => (prev + 1) % colors.length);
      } else {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '100vh',
      fontSize: '64px',
      color: colors[colorIndex],
      whiteSpace: 'pre-line',
      direction: 'rtl',
      marginLeft: '50px', 
    }}>
      <h1>{displayedText}</h1>
    </div>
  );
};

export default Home;

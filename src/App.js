import logo from './logo.svg';
import './App.css';
import { SldpPlayer } from './stream';

function App() {
  return (
    <div >
      <div style={{ display: "flex", flexDirection: "row", gap: "10px", justifyContent: "center" }}>
        <div>
          SldpPlayer with wss://5ostudioslive.cachefly.net
          <SldpPlayer />
        </div>

        <ExternalWebsite />

      </div>
      <FourButtonControl />
    </div>
  );
}

export default App;
const ExternalWebsite = () => {
  return (
    <div style={{ width: "50%", height: "70vh", border: "none" }}>
      https://cam.mshemali.dev/"
      <iframe
        src="https://cam.mshemali.dev/"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="External Website"
      />
    </div>
  );
};



const FourButtonControl = () => {
  const moveUp = async () => {
    await clawControlDirection("up");
  };
  const grab = async () => {
    await clawControlDirection("drop");

  };
  const moveLeft = async () => {
    await clawControlDirection("left");
  };

  const moveRight = async () => {
    await clawControlDirection("right");
  };

  const moveDown = async () => {
    await clawControlDirection("down");
  };

  const buttonStyle = {
    backgroundColor: "#1E90FF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };

  const rowStyle = {
    display: "flex",
    gap: "10px",
  };

  return (
    <div style={containerStyle}>
      <button onClick={moveUp} style={buttonStyle}>
        Up
      </button>
      <div style={rowStyle}>
        <button onClick={moveLeft} style={buttonStyle}>
          Left
        </button>
        <button onClick={moveRight} style={buttonStyle}>
          Right
        </button>
      </div>
      <button onClick={moveDown} style={buttonStyle}>
        Down
      </button>
      <button onClick={grab} style={buttonStyle}>
        Grab
      </button>
    </div>
  );
};



const clawControlURL = "https://api.mshemali.dev/control";

export const clawControlDirection = async (position) => {
  try {
    const response = await fetch(clawControlURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ direction: position }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log("Direction executed:", position);
    return await response.text();
  } catch (error) {
    console.error("Error:", error);
  }
};

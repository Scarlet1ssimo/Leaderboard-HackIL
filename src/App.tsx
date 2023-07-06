import "./styles.css";
import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";

function RecordRow(
  profile: {
    points: number;
    discord: string;
  },
  index: number
) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{profile.discord}</td>
      <td>{profile.points}</td>
    </tr>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [rowLimit, setRowLimit] = useState(10);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetch("https://api.hackillinois.org/profile/leaderboard/?limit=" + rowLimit)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setLeaderboard(data.profiles.map(RecordRow));
      });
  }, [rowLimit]);

  const rowLimitOptions = [10, 20, 50];
  const recordTable = (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>{leaderboard}</tbody>
    </Table>
  );

  return (
    <>
      <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
          <h1 className="header">HackIllinois Leaderboard</h1>
          <div>{isLoading ? <div>Fetching...</div> : recordTable}</div>
          <div>
            Display limit:{" "}
            <select
              value={rowLimit}
              onChange={(e) => setRowLimit(parseInt(e.target.value, 10))}
            >
              {rowLimitOptions.map((n) => {
                return <option value={n}>{n}</option>;
              })}
            </select>
          </div>
        </Container>
      </Container>
    </>
  );
}

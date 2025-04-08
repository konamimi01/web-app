import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import yaml from 'js-yaml';
import '../Css/journey.css';

const Journey = () => {
  const [journeyData, setJourneyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJourneyData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/Data/journey.yaml`);
        if (!response.ok) {
          throw new Error('Failed to fetch journey data');
        }
        const text = await response.text();
        const data = yaml.load(text);
        setJourneyData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading journey data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadJourneyData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!journeyData) return <Typography>No data available</Typography>;

  return (
    <Box className="journey-container">
      <Box className="journey-main">
        <Typography variant="h4" className="journey-title">
          {journeyData.title || 'しおりす'}
        </Typography>

        {/* 概要セクション */}
        <Paper elevation={0} className="content-section overview-section">
          <Typography variant="h5" className="section-title">概要</Typography>
          <Box className="overview-content">
            <Box className="overview-item">
              <Typography variant="subtitle1" className="overview-label">
                持ち物
              </Typography>
              <Typography variant="body1">
                パスポート、現金、スマートフォン、充電器、着替え
              </Typography>
            </Box>
            <Divider />
            <Box className="overview-item">
              <Typography variant="subtitle1" className="overview-label">
                集合場所
              </Typography>
              <Typography variant="body1">
                東京駅 丸の内中央改札口
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* スケジュールセクション */}
        <Paper elevation={0} className="content-section schedule-section">
          <Typography variant="h5" className="section-title">スケジュール</Typography>
          {Object.entries(journeyData.schedule).map(([day, data]) => (
            <Box key={day} className="schedule-day">
              <Typography variant="h6" className="day-title">
                {data.date}
              </Typography>
              <Box className="schedule-events">
                {data.events.map((event, index) => (
                  <Box key={index} className="schedule-event">
                    <Typography variant="subtitle1" className="event-time">
                      {event.time}
                    </Typography>
                    <Box className="event-details">
                      <Typography variant="body1" className="event-title">
                        {event.title}
                      </Typography>
                      {event.description && (
                        <Typography variant="body2" color="textSecondary" className="event-description">
                          {event.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    </Box>
  );
};

export default Journey;
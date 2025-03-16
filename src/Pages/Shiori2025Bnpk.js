import React, { useEffect, useState } from "react";
import yaml from "js-yaml";
import "../Css/journey.css";

function Shiori2025Bnpk() {
    const [journeyData, setJourneyData] = useState(null);

    useEffect(() => {
        const yamlPath = `${process.env.PUBLIC_URL}/Data/journey.yaml`;
        fetch(yamlPath)
            .then((response) => {
                // console.log("Fetch Response:", response);
                return response.text();
            })
            .then((text) => {
                // console.log("YAML Raw Text:", text);
                const data = yaml.load(text);
                // console.log("Parsed YAML Data:", data);
                setJourneyData(data);
            })
            // .catch((error) => console.error("Error loading YAML :", error));
    }, []);

    if (!journeyData) return <div className="loading">Loading...</div>;

    return (
        <>
            <div className="journey-container">
                {/* Header */}
                <header className="journey-header">
                    <div className="header-background">
                        {
                            /*
                            <img src="/logo.png" alt="Logo" className="header-logo" />
                            */
                        }
                        <h1 className="header-title">{journeyData.title}</h1>
                    </div>
                </header>

                {/* Main */}
                <main className="journey-main">
                    <section className="journey-overview">
                        <h2>旅の概要</h2>
                        <p>{journeyData.overview}</p>
                    </section>
                </main>

                {/* Schedule */}
                <section className="journey-schedule">
                    <h2>スケジュール</h2>
                    <div className="timeline">
                        {journeyData.schedule.map((item, index) => (
                            <div key={index} className="schedule-day">
                                <div className="timeline-marker">◆</div>
                                <div className="schedule-content">
                                    <h3 className="schedule-title">{item.day}:{item.details}</h3>
                                    <ul className="activity-list">
                                        {item.activities && item.activities.map((activity, idx) => (
                                            <li key={idx} className="activity-item">
                                                <span className="activity-time">{activity.time}</span> - {activity.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

        </>        
    )
}

export default Shiori2025Bnpk;
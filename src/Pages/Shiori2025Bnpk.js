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
                        <p className="overview-text" dangerouslySetInnerHTML={{__html: journeyData.overview.replace(/\n/g, '<br />') }} />
                    </section>

                    {/* Schedule */}
                    <section className="journey-schedule">
                        <h2>スケジュール</h2>
                        <div className="timeline">
                            {journeyData.schedule.map((item, index) => (
                                <div key={index} className="schedule-day">
                                    <div className="day-header-container">
                                        <div className="day-header">
                                            <span className="day-date">{item.date} </span>
                                            <span className="day-weekday"> ({item.weekday}) </span>
                                            <span className="day-number"> {item.ay_number}日目</span>
                                        </div>
                                    </div>
                                    <div className="timeline-marker">◆</div>
                                    <div className="schedule-content">
                                        {item.activities.map((activity, idx) => (
                                            <div key={idx} className="activity-box">
                                                <div className="activity-header">
                                                    <span className="activity-time">{activity.time}</span>
                                                    <span className="activity-title"> {activity.title}</span>
                                                </div>
                                                <div className="activity-details">
                                                    <p dangerouslySetInnerHTML={{__html: activity.description.replace(/\n/g, '<br />') }} />
                                                    {activity.notes && (
                                                        <ul className="activity-notes">
                                                            {activity.notes.map((note, nIdx) => (
                                                                <li key={nIdx}>{note}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </>        
    )
}

export default Shiori2025Bnpk;
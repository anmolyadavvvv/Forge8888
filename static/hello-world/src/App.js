import React from "react";
import { useTimelineData, useModal, useTooltip } from "./Hook/hooks";
import ErrorBoundary from "./component/ErrorBoundary";
import Modal from "./component/Modal";
import TimelineItem from "./component/TimelineItem";
import Tooltip from "./component/tooltip";
import "./App.css";

function App() {
  const { data, error } = useTimelineData();
  const { isOpen: isPRModalOpen, content: prModalContent, openModal: openPRModal, closeModal: closePRModal } = useModal();
  const { content: tooltipContent, visible: tooltipVisible, showTooltip, hideTooltip } = useTooltip();

  return (
    <ErrorBoundary>
      <div className="timeline-container">
        {data ? (
          <div className="timeline">
            <TimelineItem
              type="First commit"
              date={data.firstCommitDate}
            />

            <TimelineItem
              type={`Open MR: ${data.numberOfOpenMergeRequests}`}
              date={data.openMergeRequestDate}
              onClick={() => openPRModal(
                data.data.map((mr) => (
                  <div className="time-item" key={mr.title}>
                    <div className="time-age">{mr.age}</div>
                    <div className="time-content">
                      <div className="time-header">{mr.title}</div>
                      <div className="time-text">Assignees: {mr.assignees}</div>
                      <div className="time-text">Reviewers: {mr.reviewers}</div>
                    </div>
                  </div>
                ))
              )}
            />

            <TimelineItem
              type="PR Merge"
              date={data.completedMergeRequestDates?.length > 0
                ? data.completedMergeRequestDates[
                    data.completedMergeRequestDates.length - 1
                  ]
                : "N/A"}
              devTime={data.data.length > 0 ? data.data[0].devTime : "N/A"}
              revTime={data.data.length > 0
                ? data.data[data.data.length - 1].revTime
                : "N/A"}
            />

            <div
              className="timeline-arrow arrow-1"
              onMouseEnter={() => showTooltip(data.devTime)}
              onMouseLeave={hideTooltip}
            >
              devTime
            </div>

            <div
              className="timeline-arrow arrow-2"
              onMouseEnter={() => showTooltip(data.revTime)}
              onMouseLeave={hideTooltip}
            >
              revTime
            </div>

            <div
              className="timeline-arrow arrow-pr"
              onClick={() => openPRModal(
                data.data.map((mr) => (
                  <div className="time-item" key={mr.title}>
                    <div className="time-age">{mr.age}</div>
                    <div className="time-content">
                      <div className="time-header">{mr.title}</div>
                      <div className="time-text">Assignees: {mr.assignees}</div>
                      <div className="time-text">Reviewers: {mr.reviewers}</div>
                    </div>
                  </div>
                ))
              )}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <Tooltip visible={tooltipVisible} content={tooltipContent} />
        <Modal isOpen={isPRModalOpen} onClose={closePRModal} content={prModalContent} />
      </div>
    </ErrorBoundary>
  );
}

export default App;

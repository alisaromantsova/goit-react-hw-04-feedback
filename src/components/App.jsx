import { useState } from 'react';
import { Section } from './Section/Section';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';
export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onButtonClick = item => {
    if (item === 'good') {
      setGood(good + 1);
    } else if (item === 'neutral') {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
    countTotalFeedback();
    countPositiveFeedbackPercentage();
  };
  function countTotalFeedback() {
    const totalFeedback = good + bad + neutral;

    return totalFeedback;
  }
  function countPositiveFeedbackPercentage() {
    let positiveFeedback = ((good / (good + bad + neutral)) * 100).toFixed(2);
    if (isNaN(positiveFeedback)) {
      positiveFeedback = 0.0;
    }

    return positiveFeedback;
  }

  const options = ['good', 'neutral', 'bad'];
  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions onButton={onButtonClick} options={options} />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

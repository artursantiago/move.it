import Head from "next/head";
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../context/CountdownContext';
import { ChallengesProvider } from "../context/ChallengesContext";

import styles from '../styles/pages/Home.module.css';
import { ToggleButton } from "../components/ToggleButton";
import { ThemeProvider } from "../context/ThemeContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  currentTheme: 'light' | 'dark';
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <ThemeProvider currentTheme={props.currentTheme}>
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        
        <ToggleButton />
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
      </ThemeProvider>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted, currentTheme } = ctx.req.cookies;
  
  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      currentTheme: currentTheme ?? 'light'
    }
  }
}
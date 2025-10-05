"use client";
import { Accordion } from "./landing/Accordion";
import { Gallery } from "./landing/Gallery";
import { GithubSection } from "./landing/Github";
import { Hero } from "./landing/Hero";
import { NewsArticle } from "./landing/NewsArticle";
import { VideoSection } from "./landing/VideoSection";
import MapPage from "./map/page";
import "@/app/styles.css"
export default function Home() {
 
  return (
    <main>
      <Hero/>
      <NewsArticle/>
      <VideoSection/>
      <Accordion/>
      <Gallery/>
      <GithubSection/>
      {/* <MapPage/> */}

    </main>
  )
}
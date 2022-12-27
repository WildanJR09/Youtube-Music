import { toColonNotation } from 'colon-notation';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Musicplayer from '../components/musicplayer';
import Search from '../components/searchNav';
import MusicManager, { getCurrentQueue, getCurrentTrack, removeTrack } from '../lib/musicManager';

export default function Home() {
  const noQueue = (
    <div className='bg-[#624F82] w-full p-3 border-2 h-full border-[#5d4c7a] rounded flex items-center justify-center'>
      <p className='text-center text-gray-200 text-xl select-none'>There is no more queue ^_____^</p>
    </div>
  )
  const [currentQueue, setcurrentQueue] = useState(noQueue)
  let queue = []

  setInterval(() => {
    if (!getCurrentQueue().length) return setcurrentQueue(noQueue)
    queue.length = 0
    getCurrentQueue().map(x => {
      let ids = x.key
      queue.push(
        <div key={ids} onMouseOver={() => showDeleteQueue(ids)} onMouseOut={() => hideDeleteQueue(ids)} className='bg-[#5d4c7a] w-full border-2 border-gray-400/30 rounded relative z-10'>
          <div id={ids} onMouseOver={() => showDeleteQueue(ids)} onMouseOut={() => hideDeleteQueue(ids)} className='h-full hidden w-full absolute bg-[#5d4c7a] z-20 p-3'>
            <div className='w-full h-full flex justify-center items-center'>
              <button onClick={() => { removeFromQueue(ids) }} className='text-red-500 text-xl'>Remove</button>
            </div>
          </div>
          <div className='flex justify-between w-full items-center p-3'>
            <div className='grid'>
              <h1 className='font-semibold text-gray-200/80 truncate ... mr-10'>{x.title}</h1>
              <p className='text-gray-200/60 truncate ... mr-20'>{x.author}</p>
            </div>
            <p className='text-gray-200/80'>{toColonNotation(x.tracks.duration * 1000)}</p>
          </div>
        </div>
      )
    })
    setcurrentQueue(queue)
  }, 1000);

  function showDeleteQueue(id) {
    document.getElementById(id).classList.remove('hidden')
  }

  function hideDeleteQueue(id) {
    document.getElementById(id).classList.add('hidden')
  }

  function removeFromQueue(id) {
    removeTrack(id)
  }

  return (
    <div>
      <Head>
        <title>Youtube Music</title>
      </Head>
      <MusicManager />
      <div className='grid justify-center mt-4 md:mt-10 px-10 fixed w-full top-0 z-50'>
        <Search />
      </div>
      <div className='flex flex-col md:flex-row gap-4 justify-center items-center h-screen pt-20 pb-20 px-10'>
        <div className='w-full h-3/4 relative -z-10 rounded border-2 border-gray-400/30 bg-[#624F82]'>
          <div className='flex justify-center items-center h-full w-full'>
            <p className='text-2xl text-gray-200 select-none text-center'>There is no music playing OwO</p>
          </div>
          <Image id='image' className='rounded' layout='fill' objectFit='cover' alt='image cover' src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==' />
        </div>
        <div className='w-full md:w-3/4 h-3/4 flex flex-col'>
          <div className='bg-[#624F82] text-center z-40 md:text-2xl text-gray-200 border-2 border-gray-400/30 rounded p-2 md:p-4 mb-2 md:mb-5 sticky top-0'>
            <h1 className=''>Queue List</h1>
          </div>
          <div id='queuelist' className='flex flex-col gap-1 overflow-y-scroll scroll-hide overflow-x-hidden select-none h-full'>
            {currentQueue}
          </div>
        </div>
      </div>
      <Musicplayer />
    </div>
  );
}

import React from 'react'
import Head from 'next/head'

import {NarrowContainer} from '../components/NarrowContainer'
import {Card} from '../components/Card'
import {CardHeader} from '../components/CardHeader'

export default function Home() {
  return (
    <>
      <Head>
        <title>Exchange</title>
      </Head>

      <NarrowContainer>
        <div className="p-8">
          <Card>
            <CardHeader>Exchange</CardHeader>

            <div className="px-4 py-5 sm:p-6">tbc</div>
          </Card>
        </div>
      </NarrowContainer>
    </>
  )
}

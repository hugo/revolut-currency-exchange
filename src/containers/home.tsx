import React from 'react'
import Head from 'next/head'

import {NarrowContainer} from '../components/NarrowContainer'
import {Card} from '../components/Card'
import {CardHeader} from '../components/CardHeader'
import {Exchange} from '../components/Exchange'

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

            <div className="py-5 sm:py-6">
              <Exchange />
            </div>
          </Card>
        </div>
      </NarrowContainer>
    </>
  )
}

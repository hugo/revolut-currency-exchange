import React from 'react'
import Head from 'next/head'

import {Currency} from '../lib/currency'
import {NarrowContainer} from '../components/NarrowContainer'
import {Card} from '../components/Card'
import {CardHeader} from '../components/CardHeader'
import {Exchange} from '../components/Exchange'

type Props = {
  header?: string
}

export default function Home({header = 'Exchange'}: Props) {
  return (
    <>
      <Head>
        <title>{header}</title>
      </Head>

      <NarrowContainer>
        <div className="p-8">
          <Card>
            <CardHeader>{header}</CardHeader>

            <div className="py-5 sm:py-6">
              <Exchange />
            </div>
          </Card>
        </div>
      </NarrowContainer>
    </>
  )
}

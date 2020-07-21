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

// Hardcoded for purposes of demo
const pockets = {
  GBP: 1121.65,
  EUR: 1258.92,
  USD: 1307.31,
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
              <Exchange pockets={pockets} />
            </div>
          </Card>
        </div>
      </NarrowContainer>
    </>
  )
}

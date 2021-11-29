import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Pool } from '@uniswap/v3-sdk'
import Link from 'next/link'
import * as React from 'react'
import { useState } from 'react'

import { useAddresses } from '../../hooks/useAddress'
import { useLPPositions } from '../../hooks/usePositions'
import { inRange } from '../../utils/calculations'
import { SecondaryTab, SecondaryTabs } from '../Tabs'
import { UniswapIframe } from '../UniswapIframe'

const useStyles = makeStyles((theme) =>
  createStyles({
    tableContainer: {
      flexBasis: '72%',
      marginRight: '1.5em',
      marginTop: theme.spacing(2),
      borderRadius: theme.spacing(1),
      backgroundColor: `${theme.palette.background.paper}40`,
      height: '75vh',
    },
    isLPageTableContainer: {
      flexBasis: '72%',
      marginTop: theme.spacing(2),
      marginRight: '1.5em',
    },
    table: {
      minWidth: 650,
    },
    listLink: {
      color: '#FF007A',
    },
    linkHover: {
      '&:hover': {
        opacity: 0.7,
      },
    },
    anchor: {
      color: '#FF007A',
      fontSize: '16px',
    },
    tokenIdLink: {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    inRange: {
      backgroundColor: theme.palette.success.main,
    },
    outRange: {
      backgroundColor: theme.palette.error.main,
    },
    tabBackGround: {
      position: 'sticky',
      top: '0',
      zIndex: 20,
      background: '#2A2D2E',
    },
  }),
)

interface LPTableProps {
  isLPage?: boolean
  pool?: Pool | undefined
}

export const LPTable: React.FC<LPTableProps> = ({ isLPage, pool }) => {
  const classes = useStyles()
  const { activePositions, closedPositions, loading: lpLoading } = useLPPositions()
  const [activeTab, setActiveTab] = useState(0)
  const { wSqueeth } = useAddresses()

  return (
    <TableContainer component={Paper} className={isLPage ? classes.isLPageTableContainer : classes.tableContainer}>
      {isLPage ? (
        <SecondaryTabs
          value={activeTab}
          onChange={() => (activeTab === 0 ? setActiveTab(1) : setActiveTab(0))}
          aria-label="simple tabs example"
          centered
          variant="fullWidth"
          className={classes.tabBackGround}
        >
          <SecondaryTab label="Active" />
          <SecondaryTab label="Closed" />
        </SecondaryTabs>
      ) : null}
      <Table aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow style={{ fontSize: '0.8rem' }}>
            <TableCell align="left">Token ID</TableCell>
            <TableCell align="left">In Range</TableCell>
            <TableCell align="left">% of Pool</TableCell>
            <TableCell align="left">Liquidity</TableCell>
            {/* <TableCell align="left">Collected Fees</TableCell> */}
            <TableCell align="left">Uncollected Fees</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>

        {isLPage && activeTab === 1 ? (
          <TableBody>
            {closedPositions?.length === 0 ? (
              lpLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{ textAlign: 'center', fontSize: '16px' }}>
                    <p>Loading...</p>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{ textAlign: 'center', fontSize: '16px' }}>
                    <p>No Closed LP Positions</p>

                    <div>
                      <p>1. Mint Squeeth on the right.</p>
                      <UniswapIframe text={'2.'} />
                    </div>
                  </TableCell>
                </TableRow>
              )
            ) : (
              closedPositions?.map((p) => {
                return (
                  <TableRow key={p.id}>
                    <TableCell component="th" align="left" scope="row">
                      <a
                        href={`https://squeeth-uniswap.netlify.app/#/pool/${p.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className={classes.tokenIdLink}
                      >
                        #{p.id}
                      </a>
                    </TableCell>
                    <TableCell align="left">
                      <Chip label="Closed" size="small" />
                    </TableCell>
                    <TableCell align="left">
                      {((pool ? p.liquidity / Number(pool?.liquidity) : 0) * 100).toFixed(3)}
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ marginRight: '.5em' }}>
                        {Number(p.amount0).toFixed(4)} {p.token0.symbol}
                      </span>
                      <span>
                        {Number(p.amount1).toFixed(4)} {p.token1.symbol}
                      </span>
                    </TableCell>
                    {/* <TableCell align="left">
                <span style={{ marginRight: '.5em' }}>
                  {p.collectedFeesToken0} {p.token0.symbol}
                </span>
                <span>
                  {p.collectedFeesToken1} {p.token1.symbol}
                </span>
              </TableCell> */}
                    <TableCell align="left">
                      <span style={{ marginRight: '.5em' }}>
                        {p.fees0?.toFixed(6)} {p.token0.symbol}
                      </span>
                      <span>
                        {p.fees1?.toFixed(6)} {p.token1.symbol}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ marginRight: '.5em' }}>$ {p.dollarValue?.toFixed(2)}</span>
                    </TableCell>
                  </TableRow>
                )
              })
            )}

            {closedPositions && closedPositions?.length > 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <UniswapIframe />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody>
            {activePositions?.length === 0 ? (
              lpLoading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{ textAlign: 'center', fontSize: '16px' }}>
                    <p>Loading...</p>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center" style={{ textAlign: 'center', fontSize: '16px' }}>
                    <p>No Existing LP Positions</p>

                    <div>
                      <p>1. Mint Squeeth on the right.</p>
                      <span>
                        <UniswapIframe text={'2.'} />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              )
            ) : (
              activePositions?.slice(0, isLPage ? activePositions.length : 3).map((p) => {
                return (
                  <TableRow key={p.id}>
                    <TableCell component="th" align="left" scope="row">
                      <a
                        href={`https://squeeth-uniswap.netlify.app/#/pool/${p.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className={classes.tokenIdLink}
                      >
                        #{p.id}
                      </a>
                    </TableCell>
                    <TableCell align="left">
                      {inRange(p.tickLower.tickIdx, p.tickUpper.tickIdx, pool) ? (
                        <Chip label="Yes" size="small" className={classes.inRange} />
                      ) : (
                        <Chip label="No" size="small" className={classes.outRange} />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      {((pool ? p.liquidity / Number(pool?.liquidity) : 0) * 100).toFixed(3)}
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ marginRight: '.5em' }}>
                        {Number(p.amount0).toFixed(4)} {p.token0.symbol}
                      </span>
                      <span>
                        {Number(p.amount1).toFixed(4)} {p.token1.symbol}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ marginRight: '.5em' }}>
                        {p.fees0?.toFixed(6)} {p.token0.symbol}
                      </span>
                      <span>
                        {p.fees1?.toFixed(6)} {p.token1.symbol}
                      </span>
                    </TableCell>
                    <TableCell align="left">
                      <span style={{ marginRight: '.5em' }}>$ {p.dollarValue?.toFixed(2)}</span>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
            {!isLPage && activePositions?.length > 3 && (
              <TableRow>
                <TableCell className={classes.linkHover} colSpan={7} align="center" style={{ fontSize: '1rem' }}>
                  <Link href="/lp">View more</Link>
                </TableCell>
              </TableRow>
            )}

            {activePositions && activePositions?.length > 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <UniswapIframe />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  )
}

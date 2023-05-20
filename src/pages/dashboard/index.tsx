import styles from './styles.module.sass'
import Navbar from '@/components/navbar/Navbar'
import { setUpApiClient } from '@/services/api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from "nookies"

// dynamic import otherwise it will get an error
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false })

interface ServiceProps {
    name: string
    id: string
    price: string | number
    status: boolean
}

interface BarberProps {
    name: string
    id: string
}

interface ClientProps {
    id: string
    name: string
    schedule: string
    user_id: string
    service_id: string
    status: boolean
    service: ServiceProps
    barber: BarberProps
}

export default function Dashboard() {
    const [loading, setLoading] = useState(true)
    const [thisWeekRevenue, setThisWeekRevenue] = useState([0])
    const [monthsRevenue, setMonthsRevenue] = useState([0])

    // get data on first load
    useEffect(() => {
        async function getData() {
            const api = setUpApiClient({})

            try {
                const response = await api.get('/clients')
                const clients: ClientProps[] = response.data
                const finishedClients = clients.filter(client => client.status === true)

                // get the week
                const today = new Date()
                const dayOfWeek = today.getDay()
                const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek - 7)
                const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek - 7 + 6)

                let weekDates: string[] = [];

                for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                    let dateString = new Date(d).toLocaleString()
                    weekDates.push(dateString.slice(0, 10));
                }

                // get the week revenue
                let sundayRevenue = 0
                let mondayRevenue = 0
                let tuesdayRevenue = 0
                let wednesdayRevenue = 0
                let thursdayRevenue = 0
                let fridayRevenue = 0
                let saturdayRevenue = 0

                finishedClients.forEach((client) => {
                    if (client.schedule.includes(weekDates[0])) {
                        sundayRevenue += Number(client.service.price)

                    } else if (client.schedule.includes(weekDates[1])) {
                        mondayRevenue += Number(client.service.price)

                    } else if (client.schedule.includes(weekDates[2])) {
                        tuesdayRevenue += Number(client.service.price)
                        
                    } else if (client.schedule.includes(weekDates[3])) {
                        wednesdayRevenue += Number(client.service.price)
                        
                    } else if (client.schedule.includes(weekDates[4])) {
                        thursdayRevenue += Number(client.service.price)
                        
                    } else if (client.schedule.includes(weekDates[5])) {
                        fridayRevenue += Number(client.service.price)
                        
                    } else if (client.schedule.includes(weekDates[6])) {
                        saturdayRevenue += Number(client.service.price)
                    }
                })

                setThisWeekRevenue([sundayRevenue, mondayRevenue, tuesdayRevenue, wednesdayRevenue, thursdayRevenue, fridayRevenue, saturdayRevenue])

                // get the months of current year
                const startMonth = new Date(today.getFullYear(), 0, 1)
                const endMonth = new Date(today.getFullYear(), 11, 31)

                const months: string[] = []

                for (let m = new Date(startMonth); m <= endMonth; m.setMonth(m.getMonth() + 1)) {
                    let localeString = m.toLocaleString()
                    months.push(localeString.slice(3, 10))
                }

                // get the mont revenue
                let janRevenue = 0
                let febRevenue = 0
                let marRevenue = 0
                let aprilRevenue = 0
                let mayRevenue = 0
                let junRevenue = 0
                let julRevenue = 0
                let augRevenue = 0
                let setRevenue = 0
                let outRevenue = 0
                let novRevenue = 0
                let dezRevenue = 0

                finishedClients.forEach(client => {
                    if (client.schedule.slice(3, 10).includes(months[0])) {
                        janRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[1])) {
                        febRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[2])) {
                        marRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[3])) {
                        aprilRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[4])) {
                        mayRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[5])) {
                        junRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[6])) {
                        julRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[7])) {
                        augRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[8])) {
                        setRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[9])) {
                        outRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[10])) {
                        novRevenue += Number(client.service.price)

                    } else if (client.schedule.slice(3, 10).includes(months[11])) {
                        dezRevenue += Number(client.service.price)

                    } 
                })

                setMonthsRevenue([janRevenue, febRevenue, marRevenue, aprilRevenue, mayRevenue, junRevenue, julRevenue, augRevenue, setRevenue, outRevenue, novRevenue, dezRevenue])

                setLoading(false)
            } catch (error) {
                toast.warn('Sorry there was an error, try again later')
            }
        }

        getData()
    }, [])

    // apex chart configuration
    const options = {
        options: {
            chart: {
                id: 'basic-bar',
                zoom: {
                    enabled: false
                }
            },
            xaxis: {
                categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',],
                labels: {
                    style: {
                        colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ['#fff'],
                        fontSize: '13px'
                    },
                    formatter: (val: any) => { return val + ' $' }
                }
            },
            title: {
                text: 'Revenue last week',
                style: {
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: 'normal'
                }
            }
        },
        series: [{
            name: 'Revenue',
            data: thisWeekRevenue
        }]
    }

    const options2 = {
        options: {
            chart: {
                id: 'basic-bar',
                zoom: {
                    enabled: false
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff']
                    }
                }
            },
            title: {
                text: 'Revenue per month',
                style: {
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: 'normal'
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ['#fff'],
                        fontSize: '13px'
                    },
                    formatter: (val: any) => { return val + ' $' }
                }
            },
        },
        series: [{
            name: 'Revenue',
            data: monthsRevenue
        }]
    }

    return (
        <div className={styles.container}>
            <aside className={styles.asideContainer}>
                <Navbar />
            </aside>
            <main className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1>Dashboard</h1>
                </div>
                <div className={styles.dashboardContainer}>
                    {loading ? (
                        <Spinner className={styles.spinner} color='#fff' />
                    ) : (
                        <>
                            <div className={styles.thisWeek}>
                                <ApexCharts options={options.options} series={options.series} type='line' />
                            </div>

                            <div className={styles.thisMonth}>
                                <ApexCharts options={options2.options} series={options2.series} type='line' />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

// check user Authentication 
export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx)

    if (!cookies['@barberProToken']) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}


import styles from './styles.module.sass'
import Navbar from '@/components/demo/navbar'
import { setUpApiClient } from '@/services/api';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';

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
    // get the year
    const date = new Date()
    const year = date.getFullYear()

    const [selectedYear, setSelectedYear] = useState(year)
    const thisYearRevenue = {
        date: 2023,
        revenue: [15100, 15400, 14300, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }

    const [selectedYearRevenue, setSelectedYearRevenue] = useState({
        date: 2023,
        revenue: [15100, 15400, 14300, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    })

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
            data: [0, 3100, 4000, 3700, 3500, 4300, 0]
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
                text: 'Revenue per month ' + selectedYear,
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
            data: selectedYearRevenue.revenue
        }]
    }

    useEffect(() => {

        if (selectedYear === 2023) {
            setSelectedYearRevenue({
                date: 2023,
                revenue: [15100, 15400, 14300, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            })
            return
        }

        setSelectedYearRevenue({
            date: selectedYear,
            revenue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        })
    }, [selectedYear])



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
                    <div className={styles.thisWeek}>
                        <ApexCharts options={options.options} series={options.series} type='bar' />
                    </div>

                    <div className={styles.thisMonth}>
                        <label>
                            Select year
                            <input className={styles.input} type="number" min='1900' max={selectedYear} value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} />
                        </label>
                        <ApexCharts options={options2.options} series={options2.series} type='bar' />
                    </div>

                </div>
            </main>
        </div>
    )
}

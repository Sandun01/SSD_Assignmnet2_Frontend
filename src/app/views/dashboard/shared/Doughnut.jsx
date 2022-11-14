import React, { useEffect, useState } from 'react'
import ReactEcharts from 'echarts-for-react'
import { useTheme } from '@material-ui/styles'

const sampleData = [
    {
        value: 65,
        name: 'Nuwara Eliya',
    },
    {
        value: 20,
        name: 'Ella',
    },
    {
        value: 15,
        name: 'Haputale',
    },
]

const DoughnutChart = ({ height, color = [], data }) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        if (data != null) {
            // console.log(data, "Chart")
            //setup chart data
            // var counts = charDataArr.reduce((p, c) => {
            //     var name = c.condition
            //     if (!p.hasOwnProperty(name)) {
            //         p[name] = 0
            //     }
            //     p[name]++
            //     return p
            // }, {})
            // var countsExtended = Object.keys(counts).map((k) => {
            //     return { name: k, value: counts[k] }
            // })
            // console.log(countsExtended)
            setChartData(data)

        } else {
            setChartData(sampleData)
        }
    }, [])

    const theme = useTheme()
    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'Traffic Rate',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '40%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center', // shows the description data to center, turn off to show in right side
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(0, 135, 3, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: chartData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }

    return (
        <ReactEcharts
            style={{ height: height }}
            option={{
                ...option,
                color: [...color],
            }}
        />
    )
}

export default DoughnutChart

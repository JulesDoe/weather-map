import { BitmapText, Graphics } from 'pixi.js'
import { group, mean, polygonHull, polygonCentroid } from 'd3'
import { average, rgb, formatHex } from 'culori'

const width = .6
const cellSize = 1
const bandwidth = 10
const thresholds = 10

export default entities => {

    const stage = new Graphics()
    stage.interactiveChildren = false
    stage.name = 'clusters'
    stage.alpha = 1
    s.viewport.addChild(stage)

    group(entities, e => e['cluster'])
        .forEach(cluster => {

            if (cluster[0]['cluster'] === '-1')
                return // Romove no clustered entities

            const slope = mean(cluster.map(e => e.slope))

            const coordinates = cluster.map(e => [e.x, e.y])
            const polygon = polygonHull(coordinates)
            const center = polygonCentroid(polygon)

            // const colors = cluster.map(e => rgb(e['color']))
            // let colorRGB = average(colors, 'rgb')
            // let colorHex = formatHex(colorRGB)

            // stage.lineStyle(.2, 0xFFFFFF)
            // stage.beginFill('0x' + colorHex.substring(1), 1)
            // stage.alpha = .5
            // polygon.forEach((p, i) => (i == 0) ? stage.moveTo(p[0], p[1]) : stage.lineTo(p[0], p[1]))
            // stage.closePath()

            const bitmap = new BitmapText(
                (slope > 0) ? 'H' : 'L',
                {
                    fontName: 'Lato',
                    fontSize: 20,
                    align: 'center',
                    tint: (slope > 0) ? s.red : s.blue,
                })

            bitmap.position.set(center[0] - bitmap.textWidth / 2, center[1] - bitmap.textHeight / 2)


            const background = new Graphics();
            // background.lineStyle(.5, 0x00FF00, .6) // Draw contour to verify
            background.beginFill(0xFFFFFF, 1)
            background.drawRoundedRect(bitmap.x, bitmap.y + 1.5, bitmap.textWidth, bitmap.textHeight, 1)

            stage.addChild(background)
            stage.addChild(bitmap)

            s.texts.push(bitmap)

        })


}
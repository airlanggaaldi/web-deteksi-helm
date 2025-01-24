import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import '@tensorflow/tfjs-backend-cpu';
// import * as tf from '@tensorflow/tfjs-node-gpu';
// import * as tflite from '@tensorflow/tfjs-tflite';
// import { loadImage } from "canvas";

export async function GET() {
      return Response.json({
            test: 'oke'
      })
}


export async function POST(req: Request) {
      try {
            const data = await req.formData();

            const image = data.get('image') as File;

            if (!image) {
                  return NextResponse.json({
                        info: "error",
                        message: 'No image provided',
                  }, { status: 400 });
            }

            const arrayBuffer = await image.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadDir = path.join(process.cwd(), 'public', 'uploads');
            const fileName = `${Date.now()}-${image.name}`;

            if (!fs.existsSync(uploadDir)) {
                  fs.mkdirSync(uploadDir, { recursive: true });
            }

            const filePath = path.join(uploadDir, fileName);
            fs.writeFileSync(filePath, buffer);

            // const modelPath = path.join(process.cwd(), 'public', '/model/best10epochs_float32.tflite');
            // const model = await tf.node.loadSavedModel(modelPath);

            // // ** Load Gambar dan Konversi ke Tensor **
            // const imageTensor = tf.node.decodeImage(buffer, 3) // Decode buffer ke RGB
            //       .resizeBilinear([224, 224]) // Resize ke dimensi input model
            //       .expandDims(0) // Tambahkan dimensi batch
            //       .toFloat()
            //       .div(255); // Normalisasi ke rentang [0, 1]

            // // ** Prediksi dengan Model **
            // const prediction = model.predict(imageTensor) as tf.Tensor;
            // const predictionData = await prediction.data();

            // console.log(predictionData)

            return NextResponse.json({
                  info: "berhasil",
                  image: `/uploads/${fileName}`,
            }, { status: 200 })

      } catch (err) {
            console.log("error backend: ", err)
      }
}
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const connection = require("../db-Config");

module.exports = {
  name: "file",
  actions: {
    save: {
      rest: "POST /",
      async handler(ctx) {
        try {
          const { image } = ctx.params;

          // Process the stream and convert it to a buffer
          const buffer = await this.processStream(image.stream);

          // Generate a unique filename using UUID
          const filename = `${uuidv4()}${path.extname(image.originalname)}`;

          // Resize and save the image using Sharp
          await sharp(buffer)
            .resize(200, 200)
            .toFormat("jpg")
            .toFile(`../uploads/${filename}`);

          // Save the image path to the database
          const imagePath = `../uploads/${filename}`;
          const insertData = "INSERT INTO images (filename) VALUES (?)";
          await connection.execute(insertData, [imagePath]);

          return "File uploaded successfully";
        } catch (error) {
          console.error(error);
          throw new Error("File upload failed");
        }
      },
    },
  },

  methods: {
    processStream(stream) {
      const chunks = [];
      return new Promise((resolve, reject) => {
        stream.on("data", (chunk) => {
          chunks.push(Buffer.from(chunk));
        });
        stream.on("error", (err) => reject(err));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
      });
    },
  },
};

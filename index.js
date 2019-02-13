// Catch all buffs and then build a single buff on stream
const minStreamToBuffer = function(stream) {
  // Buffer Container
  const buffs = [];

  return new Promise((resolve, reject) => {
    if (stream.readable) {
      stream.on("data", data => data && buffs.push(data));

      stream.on("end", () => {
        resolve(buffs.length > 0 ? Buffer.concat(buffs) : null);
      });
      stream.on("error", reject);
    } else {
      reject(new Error("Cannot read this file."));
    }
  });
};

module.exports = minStreamToBuffer;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const embeddedBiSchema = new Schema({
  reportId: {
    type: String
  },
  embedUrl: {
    type: String
  },
  embedToken: {
    type: String
  },
  pageId: {
    type: String
  },
  embedType: {
    type: String
  }
});

module.exports = mongoose.model("EmbeddedBI", embeddedBiSchema);

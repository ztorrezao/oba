import { google } from 'googleapis';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

// loading env variables
const {
  SID: accountSid,
  KEY: TwillioAuthToken,
  APIKEY: googleApiKey,
  CX: cx,
} = process.env;

// auth in twilio
twilio(accountSid, TwillioAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch('v1');

/**
 * @class KioniBot
 * @description class that will implement bot functionality
 */
class KioniBot {
  /**
   * @memberof KioniBot
   * @param {object} req - Request to the route
   * @param {object} res - Response sent from the controller
   * @param {object} next - Error handler
   * @return {object} - object representing the response message
   */
  static async googleSearch(req, res, next) {
    const twiml = new MessagingResponse();
    const q = req.body.Body;
    const options = { cx, q, auth: googleApiKey };

    try {
      const result = await customsearch.cse.list(options);
      const firstResult = result.data.items[0];
      const searchData = firstResult.snippet;
      const link = firstResult.link;

      twiml.message(`*Resultados de '${q}':*\n${searchData}\n${link}`);

      res.set('Content-Type', 'text/xml');

      return res.status(200).send(twiml.toString());
    } catch (error) {
      return next(error);
    }
  }
}

export default KioniBot;

import { debug } from 'console';

interface Request {
    date_time: string;
    location: string;
    timestamp: number;
    // other request data
  }

export class LoggerRepository {

    private requests: Request[] = [];

    constructor() {
        debug("Logger Repoistory Bootstrap")
       
    }

    addRequest(request: Request) {
        this.requests.push(request);
    }
    
    getRecentRequests(): any {
        // Sort the requests by timestamp in descending order (most recent first).
        const sortedRequests = this.requests.sort((a, b) => b.timestamp - a.timestamp);

        // Slice the first 10 requests or less if there are fewer than 10.
        const recentRequests = sortedRequests.slice(0, 10);

        return {
            recent_searches : recentRequests
        }
    }

    getTopQueriesBetween(startTimestamp: number, endTimestamp: number): any {
        // Filter the requests that fall within the given time range.
        const filteredRequests = this.requests.filter(
          (request) => request.timestamp >= startTimestamp && request.timestamp <= endTimestamp
        );
    
        // Sort the filtered requests by timestamp in descending order (most recent first).
        const sortedRequests = filteredRequests.sort((a, b) => b.timestamp - a.timestamp);
    
        // Slice the first 10 requests or less if there are fewer than 10.
        const top10Requests = sortedRequests.slice(0, 10);
    
        return {
            top_10_searches : top10Requests
        }
      }

      findMostActiveHourPeriod(startTimestamp: number, endTimestamp: number): any | null {
        let mostActiveHour: number | null = null;
        let maxRequestsInHour = 0;

        debug("Start time and end ", startTimestamp, endTimestamp);

        for (let hour = Number(startTimestamp); hour <= Number(endTimestamp); hour = Number(hour) + 3600000) {

            // console.log("Start time and end ", hour, startTimestamp, endTimestamp);

            // Calculate the end of the current hour.
            const nextHour = Number(hour) + 3600000;

            // Count requests within the current hour.
            const requestsInHour = this.requests.filter(
                (request) => request.timestamp >= hour && request.timestamp < nextHour
            ).length;

            console.log("Length  ", requestsInHour);

            if (requestsInHour > maxRequestsInHour) {
                maxRequestsInHour = requestsInHour;
                mostActiveHour = hour;
            }
        }

        if (mostActiveHour === null) {
            return null;
        }

        return {
            most_active_hour: new Date(mostActiveHour)
        }
      }
}
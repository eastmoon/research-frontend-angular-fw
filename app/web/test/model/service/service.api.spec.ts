// Test framework Library
import '@angular/compiler'
import { assert } from "chai";
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpBackend, HttpRequest, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';

// Application framework Library
import { APIService } from "@/model/service/api";

// Declared class or variable
export class FakeHttpBackend implements HttpBackend {
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return new Observable((observer: Observer<HttpEvent<any>>) => {
            // A successful response is delivered on the event stream.
            observer.next(
              new HttpResponse({
                body: req.serializeBody(),
                status: 200,
                statusText: 'fakeStatusText',
                url: req.urlWithParams
              }),
            );
            // The full body has been received and delivered, no further events
            // are possible. This request is complete.
            observer.complete();
        });
    }
}
const httpClient = new HttpClient(new FakeHttpBackend());
// Test case
describe('Model.Service.API Tests', () => {
    it('inject case', () => {
        let apiService : APIService = new APIService(httpClient);
        assert.ok(1 === 1);
    });
});

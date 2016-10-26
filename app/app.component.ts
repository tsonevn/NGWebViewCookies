import {Component} from "@angular/core";
import {WebView, LoadEventData} from "ui/web-view";
import {setTimeout} from "timer"
import {isAndroid, isIOS} from "platform"

declare var NSHTTPCookieStorage:any;
declare var NSURL:any;

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public counter: number = 16;

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    
    public onviewloaded(args){
        var webview:WebView=<WebView>args.object;
        webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {

        let message;
        if (!args.error) {
            message = "WebView finished loading " + args.url;
                
            }
        else {
            message = "Error loading " + args.url + ": " + args.error;
        
        }
        console.log(message);
        });
    }


    public onTap(){
    if(isAndroid){
            console.log("--------------------------------cookies anroid------------------------------");
            var cookieManager = android.webkit.CookieManager.getInstance();  
            var cookies= cookieManager.getCookie("https://httpbin.org");
            console.log(cookies);
            console.log("-------------------------------- end cookies------------------------------");
    }

    if(isIOS){
            console.log("--------------------------------cookies iOS------------------------------");
                 var url = NSURL.URLWithString("https://httpbin.org");
                
                var cookiesStorage = NSHTTPCookieStorage.sharedHTTPCookieStorage;
                console.log(cookiesStorage);
                 var array = cookiesStorage.cookiesForURL(url);
                console.log(array[0].value);
            console.log("-------------------------------- end cookies------------------------------");
    }
            
    }
}

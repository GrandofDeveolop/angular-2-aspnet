import 'angular2-universal-polyfills';
import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformNodeDynamic } from 'angular2-universal';
import { AppModule } from './app/app.module';

enableProdMode();
const platform = platformNodeDynamic();

export default function (params: any) : Promise<{ html: string, globals?: any }> {
    const requestZone = Zone.current.fork({
        name: 'angular-universal request',
        properties: {
            baseUrl: '/',
            requestUrl: params.url,
            originUrl: params.origin,
            preboot: false,
            // TODO: Render just the <app> component instead of wrapping it inside an extra HTML document
            // Waiting on https://github.com/angular/universal/issues/347
            document: '<!DOCTYPE html><html><head></head><body><app></app></body></html>'
        }
    });

    return requestZone.run<Promise<string>>(() => platform.serializeModule(AppModule))
        .then(html => {
            return { html: html };
        });
}

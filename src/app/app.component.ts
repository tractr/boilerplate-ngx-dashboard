import {
	ChangeDetectorRef,
	Component,
	HostBinding,
	NgZone,
	OnDestroy,
	OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators/filter';
import { ModelsLinks } from '@app/shared';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
	/** CSS */
	@HostBinding('class') componentCssClass;
	/** @type {Subject<void>} Observables unsubscriber*/
	private unsubscribe: Subject<void> = new Subject<void>();
	/** @type {ModelLink[]} Side links*/
	navigationSideMenu = ModelsLinks;
	/** @type {string[]} Routes where the footer should be displayed  */
	private routesFooter: string[] = ['', 'home'];
	/** @type {string[]} Routes where the footer should be displayed  */
	private routesNoHeader: string[] = ['session'];
	/** @type {boolean} */
	displayFooter = false;
	/** @type {boolean} */
	displayHeader = false;
	/** @type {string} */
	appName = environment.appName;

	constructor(
		private translateService: TranslateService,
		private router: Router,
		private titleService: Title,
		private zone: NgZone,
		private cd: ChangeDetectorRef
	) {
		this.initLang();
	}

	ngOnInit() {
		// Animation on navigation
		this.router.events
			.pipe(filter(event => event instanceof ActivationEnd))
			.subscribe((event: ActivationEnd) => {
				let lastChild = event.snapshot;
				while (lastChild.children.length) {
					lastChild = lastChild.children[0];
				}
				const { title } = lastChild.data;
				this.titleService.setTitle(
					title ? `${title} - ${this.appName}` : this.appName
				);
				// Show footer
				const url = event.snapshot.url.toString();
				this.displayFooter = this.routesFooter.some(r => r === url);
				this.displayHeader = !this.routesNoHeader.some(r => r === url);
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe.next();
	}

	initLang(): any {
		// Setup translate service
		this.translateService.addLangs(environment.languages);
		const availableLangs = this.translateService.getLangs();
		const defaultLang = this.translateService.getLangs()[0];
		this.translateService.setDefaultLang(defaultLang);

		// Sync lang to storage
		if (!localStorage.getItem('lang')) {
			// Force en as default
			localStorage.setItem('lang', defaultLang);
		} else {
			if (!availableLangs.includes(localStorage.getItem('lang'))) {
				localStorage.setItem('lang', defaultLang);
			}
		}

		this.translateService.use(localStorage.getItem('lang'));

		window.addEventListener('storage', (event: StorageEvent) => {
			if (event.key === 'lang') {
				this.translateService.use(localStorage.getItem('lang'));
			}
		});
	}

	setLang(lang: string) {
		this.translateService.use(lang);
		localStorage.setItem('lang', lang);
		this.cd.detectChanges();
	}
}

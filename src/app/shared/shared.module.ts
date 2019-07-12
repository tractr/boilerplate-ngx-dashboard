import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SafeHtmlPipe } from '@app/pipes/safe-html.pipe';
import { TranslateEntryPipe } from '@app/pipes/translate-entry.pipe';
import { TranslateCutPipe } from '@app/pipes/translate-cut.pipe';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		Nl2BrPipeModule,
		EditorModule,
		NgZorroAntdModule
	],
	declarations: [SafeHtmlPipe, TranslateEntryPipe, TranslateCutPipe],
	providers: [{ provide: NZ_I18N, useValue: en_US }],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		Nl2BrPipeModule,
		EditorModule,
		NgZorroAntdModule,
		SafeHtmlPipe,
		TranslateEntryPipe,
		TranslateCutPipe
	]
})
export class SharedModule {}

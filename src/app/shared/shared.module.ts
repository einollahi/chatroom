import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// shared modules
import { MaterialsModule } from './modules/materials.module';
// shared components
import { InputComponent } from './components/elements/input/input.component';
import { TextareaComponent } from './components/elements/input/textarea.component';
import { PostComponent } from './components/business/post/post.component';
import { ListenerDirective } from './components/business/post/listener.directive';
import { UserComponent } from './components/business/user/user.component';

// directives

// business components

const sharedComponents: any[] = [InputComponent, TextareaComponent];
const modules = [
  CommonModule,
  FlexLayoutModule,
  RouterModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialsModule,
];
const business_components: any[] = [PostComponent, UserComponent];
const directives: any[] = [ListenerDirective];

@NgModule({
  imports: [...modules],
  declarations: [...sharedComponents, ...directives, ...business_components],
  exports: [
    ...modules,
    ...sharedComponents,
    ...directives,
    ...business_components,
  ],
  entryComponents: [],
})
export class SharedModule {}

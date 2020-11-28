import { DebugElement } from '@angular/core';
import {  async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Mock } from 'ts-mockery';
import { Shallow } from 'shallow-render';
import { QueryMatch } from 'shallow-render/dist/lib/models/query-match';
import { AppModule } from './app.module';
import { StarWarsService } from './starwars.service';
import { of } from 'rxjs'

describe('AppComponent', () => {
  let shallow:  Shallow<AppComponent>;
  let starwarServiceMock = Mock.of<StarWarsService>({
    getPeople: () => of({results: [] })
  });

  beforeEach(async(() => {
    shallow = new Shallow(AppComponent, AppModule)
      .provide(StarWarsService)
      .mock(StarWarsService, starwarServiceMock)
  }));

  it('should render the title', async () => {
    const { page } = await renderRoot();
    expect(page.title.nativeElement.innerText).toBe('Intergalactic Star Wars Database');
  });

  const renderRoot = async () => {
    const renderer = await shallow.render(`<app-root></app-root>`);

    return {
      ...renderer,
      page: Page(renderer.find)
    }
  };

  const Page = (find: (selector: string) => QueryMatch<DebugElement>) => {
    return {
      get title() {
        return find('[data-e2e=sw-title]')
      }
    }
  };

});

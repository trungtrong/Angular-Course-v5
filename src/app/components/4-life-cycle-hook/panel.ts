export class Panel {
    public title: string;
    public content: string;
    public hide: boolean;

    constructor(title: string, content: string) {
      this.title = title;
      this.content = content;
      this.hide = true;
    }

    toggle() {
      this.hide = !this.hide;
    }
}

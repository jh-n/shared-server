import { EventEmitter as _EventEmitter } from "events";

type EventMap = Record<string | symbol, (...args: any[]) => void>;

export class EventEmitter<
  EM extends EventMap = EventMap
> extends _EventEmitter {
  emit<T extends keyof EM>(eventName: T, ...args: Parameters<EM[T]>): boolean {
    return super.emit(eventName as string, ...args);
  }
  on<T extends keyof EM>(eventName: T, listener: EM[T]): this {
    return super.on(eventName as string, listener);
  }
  once<T extends keyof EM>(eventName: T, listener: EM[T]): this {
    return super.once(eventName as string, listener);
  }
  rawListeners<T extends keyof EM>(eventName: T): EM[T][] {
    return super.rawListeners(eventName as string) as EM[T][];
  }
  listeners<T extends keyof EM>(eventName: T): EM[T][] {
    return super.listeners(eventName as string) as EM[T][];
  }
  prependListener<T extends keyof EM>(eventName: T, listener: EM[T]): this {
    return super.prependListener(eventName as string, listener);
  }
  prependOnceListener<T extends keyof EM>(eventName: T, listener: EM[T]): this {
    return super.prependOnceListener(eventName as string, listener);
  }
  addListener<T extends keyof EM>(eventName: T, listener: EM[T]): this {
    return super.addListener(eventName as string, listener);
  }
  removeListener<T extends keyof EM>(eventName: T, listener: EM[T]): this {
    return super.removeListener(eventName as string, listener);
  }
  removeAllListeners<T extends keyof EM>(eventName: T): this {
    return super.removeAllListeners(eventName as string);
  }
  off<T extends keyof EM>(eventName: T, listener: EM[T]): this {
    return super.off(eventName as string, listener);
  }
}

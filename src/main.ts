import 'reflect-metadata';
import {Container} from 'inversify';
import {ILogger} from './common/logger/logger-interface.js';
import LoggerService from './common/logger/logger.js';
import {Component} from './models/component.js';
import {IConfig} from './common/config/config-interface.js';
import ConfigService from './common/config/config-service.js';
import Application from './app/application.js';
import {IDatabase} from './common/database-client/databse-interface.js';
import DatabaseClient from './common/database-client/database-client.js';
import {IUserService} from './entities/user/service/user-service-interface.js';
import UserService from './entities/user/service/user-service.js';
import {UserEntity, UserModel} from './entities/user/db-user.js';
import {IFilmService} from './entities/film/service/film-service-interface.js';
import {FilmEntity, FilmModel} from './entities/film/db-film.js';
import FilmService from './entities/film/service/film-service.js';
import { types } from '@typegoose/typegoose';
import {IController} from './common/controller/controller-interface.js';
import {IExceptionFilter} from './common/errors/exception-filter-interface.js';
import FilmController from './entities/film/controller/film-controller.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import UserController from './entities/user/controller/user-controller.js';

const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<ILogger>(Component.ILogger).to(LoggerService).inSingletonScope();
applicationContainer.bind<IConfig>(Component.IConfig).to(ConfigService).inSingletonScope();
applicationContainer.bind<IDatabase>(Component.IDatabase).to(DatabaseClient).inSingletonScope();
applicationContainer.bind<IUserService>(Component.IUserService).to(UserService);
applicationContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<IFilmService>(Component.IFilmService).to(FilmService);
applicationContainer.bind<types.ModelType<FilmEntity>>(Component.FilmModel).toConstantValue(FilmModel);
applicationContainer.bind<IController>(Component.FilmController).to(FilmController).inSingletonScope();
applicationContainer.bind<IExceptionFilter>(Component.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
applicationContainer.bind<IController>(Component.UserController).to(UserController).inSingletonScope();


const application = applicationContainer.get<Application>(Component.Application);
await application.init();

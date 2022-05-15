import app from './app';

app.listen(process.env.PORT  || 8085, () => {console.log(`Server started on port ${process.env.PORT ?? 8085}`)});

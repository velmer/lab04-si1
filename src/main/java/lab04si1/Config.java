package lab04si1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ResourceProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * Configurações para a aplicação.
 *
 * @author Vélmer Oliveira
 */
@Configuration
public class Config extends WebMvcConfigurerAdapter {

    private ResourceProperties resourceProperties;

    @Autowired
    public Config(ResourceProperties resourceProperties) {
        this.resourceProperties = resourceProperties;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Integer cachePeriod = resourceProperties.getCachePeriod();
        registry.addResourceHandler("/js/**")
                .addResourceLocations("/js/")
                .setCachePeriod(cachePeriod);

        registry.addResourceHandler("/css/**")
                .addResourceLocations("/css/")
                .setCachePeriod(cachePeriod);

        registry.addResourceHandler("/img/**")
                .addResourceLocations("/img/")
                .setCachePeriod(cachePeriod);

        registry.addResourceHandler("/view/**")
                .addResourceLocations("/view/")
                .setCachePeriod(cachePeriod);

        registry.addResourceHandler("/**")
                .addResourceLocations("/index.html")
                .setCachePeriod(cachePeriod)
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        return location.exists() && location.isReadable() ? location : null;
                    }
                });
    }
}
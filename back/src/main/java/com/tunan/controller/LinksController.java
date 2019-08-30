package com.tunan.controller;

import com.tunan.domain.Links;
import com.tunan.service.LinksService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
public class LinksController {
    @Autowired
    private LinksService linksService;

    @RequestMapping("/getLinks")
    public List<Links> getLinks(int kid){
        return linksService.getLinks(kid);
    }

    @RequestMapping("/getAllLinks")
    public List<Links> getAllLinks(Integer start, Integer num){
        return linksService.getAllLinks(start,num);
    }

}
